package com.project.Shoppinglist.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@AllArgsConstructor
@Getter
@Setter
public class UserModel {

    @Id
    private Long id;
    private String userName;
    private String password;

}
