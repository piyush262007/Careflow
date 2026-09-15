package com.careflow.storage.service.impl;

import com.careflow.common.exception.BadRequestException;
import com.careflow.common.exception.CustomException;
import com.careflow.common.exception.ErrorCode;
import com.careflow.storage.service.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@Slf4j
public class StorageServiceImpl implements StorageService {

    private final Path rootLocation;
    private static final long MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
    private static final List<String> ALLOWED_MIME_TYPES = List.of("image/jpeg", "image/png", "image/webp");

    public StorageServiceImpl(@Value("${careflow.storage.path:./uploads}") String uploadPath) {
        this.rootLocation = Paths.get(uploadPath).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.rootLocation);
        } catch (Exception ex) {
            log.error("Could not create storage root directory: ", ex);
        }
    }

    @Override
    public String storeFile(MultipartFile file, String subDirectory) {
        if (file.isEmpty()) {
            throw new BadRequestException("Failed to store empty file.");
        }

        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new BadRequestException("File size exceeds maximum allowed limit of 5MB.");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_MIME_TYPES.contains(contentType.toLowerCase())) {
            throw new BadRequestException("Invalid file type. Only JPEG, PNG, and WEBP image formats are supported.");
        }

        String originalFilename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String extension = "";
        int i = originalFilename.lastIndexOf('.');
        if (i > 0) {
            extension = originalFilename.substring(i);
        }

        String newFileName = UUID.randomUUID().toString() + extension;
        Path targetFolder = this.rootLocation.resolve(subDirectory);

        try {
            Files.createDirectories(targetFolder);
            Path destinationFile = targetFolder.resolve(newFileName).normalize().toAbsolutePath();
            Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/" + subDirectory + "/" + newFileName;
        } catch (IOException ex) {
            log.error("Failed to store file: ", ex);
            throw new CustomException("Failed to store file: " + ex.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public void deleteFile(String filePath) {
        if (filePath == null || filePath.isBlank()) return;
        try {
            Path file = this.rootLocation.resolve(filePath.replace("/uploads/", "")).normalize();
            Files.deleteIfExists(file);
        } catch (IOException ex) {
            log.warn("Could not delete file: {}", filePath);
        }
    }
}
