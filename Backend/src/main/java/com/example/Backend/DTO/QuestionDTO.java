package com.example.Backend.DTO;

public class QuestionDTO {

        private String amount;
        private String valueOfCategory;
        private String type;
        private String difficulty;

        // Getters and setters
        public String getAmount() {
            return amount;
        }

        public void setAmount(String amount) {
            this.amount = amount;
        }

        public String getValueOfCategory() {
            return valueOfCategory;
        }

        public void setValueOfCategory(String valueOfCategory) {
            this.valueOfCategory = valueOfCategory;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getDifficulty() {
            return difficulty;
        }

        public void setDifficulty(String difficulty) {
            this.difficulty = difficulty;
        }


}
