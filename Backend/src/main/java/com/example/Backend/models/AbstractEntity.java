package com.example.Backend.models;

import jakarta.persistence.*;

import java.util.Objects;


@MappedSuperclass
public abstract class AbstractEntity {

    @TableGenerator(
            name = "yourTableGenerator",
            allocationSize = 1,
            initialValue = 1)
    @Id
    @GeneratedValue(
            strategy= GenerationType.TABLE,
            generator="yourTableGenerator")
        private int id;

        public int getId() {
            return id;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            AbstractEntity that = (AbstractEntity) o;
            return id == that.id;
        }

        @Override
        public int hashCode() {
            return Objects.hash(id);
        }
    }

