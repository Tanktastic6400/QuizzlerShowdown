package com.example.Backend.models;

import jakarta.persistence.*;

import java.util.Objects;


@MappedSuperclass
public abstract class AbstractClass {

    @Id
    @GeneratedValue(
            strategy= GenerationType.IDENTITY)
        private int id;

        public int getId() {
            return id;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            AbstractClass that = (AbstractClass) o;
            return id == that.id;
        }

        @Override
        public int hashCode() {
            return Objects.hash(id);
        }
    }

