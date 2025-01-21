package com.example.Backend.DTO;

import java.util.Objects;

public class ScoreInfoDTO {
    private String username;
    private int score;


    public ScoreInfoDTO(int score, String username){
        this.username = username;
        this.score = score;

    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ScoreInfoDTO that = (ScoreInfoDTO) o;
        return getScore() == that.getScore();
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getScore());
    }
}
