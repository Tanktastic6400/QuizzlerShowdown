package com.example.Backend.models;

import jakarta.persistence.*;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.MappedSuperclass;


import java.util.Objects;

@MappedSuperclass
public abstract class AbstractClass {

    @Id
    @GeneratedValue(

            strategy= GenerationType.IDENTITY)

        private Long id;

        public Long getId() {
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


