package com.careflow.dashboard.service;

import com.careflow.dashboard.dto.PatientDashboardResponse;
import com.careflow.dashboard.dto.TodayCareResponse;

public interface DashboardService {

    PatientDashboardResponse getPatientDashboard(String email);

    TodayCareResponse getTodayCare(String email);
}
