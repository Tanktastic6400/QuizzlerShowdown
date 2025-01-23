package com.example.Backend.utils;

import java.util.concurrent.atomic.AtomicInteger;

public class RateLimiter {
    private final int maxRequestsPerMinute;
    private final AtomicInteger requestCount = new AtomicInteger(0);
    private long windowStartTime;

    public RateLimiter(int maxRequestsPerMinute) {
        this.maxRequestsPerMinute = maxRequestsPerMinute;
        this.windowStartTime = System.currentTimeMillis();
    }

    public synchronized boolean throttle() {
        long currentTime = System.currentTimeMillis();

        // Reset the counter if the window has passed
        if (currentTime - windowStartTime > 15000) { // 60000ms = 1 minute
            windowStartTime = currentTime;
            requestCount.set(0);
        }

        if (requestCount.incrementAndGet() <= maxRequestsPerMinute) {
            return true; // Allow the request
        } else {
            requestCount.decrementAndGet(); // Rollback the increment
            return false; // Reject the request
        }
    }
}