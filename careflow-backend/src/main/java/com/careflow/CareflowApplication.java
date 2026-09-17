package com.careflow;

import com.careflow.auth.entity.User;
import com.careflow.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class CareflowApplication {

    public static void main(String[] args) {
        SpringApplication.run(CareflowApplication.class, args);
    }

    @Bean
    public static CommandLineRunner seedPasswords(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            userRepository.findByEmail("admin@careflow.com").ifPresent(user -> {
                user.setPassword(passwordEncoder.encode("Admin123!"));
                userRepository.save(user);
            });

            userRepository.findByEmail("doctor@careflow.com").ifPresent(user -> {
                user.setPassword(passwordEncoder.encode("Doctor123!"));
                userRepository.save(user);
            });

            userRepository.findByEmail("patient@careflow.com").ifPresent(user -> {
                user.setPassword(passwordEncoder.encode("Patient123!"));
                userRepository.save(user);
            });

            System.out.println(">>> CAREFLOW SEEDED USER PASSWORDS UPDATED SUCCESSFULLY <<<");
        };
    }
}
