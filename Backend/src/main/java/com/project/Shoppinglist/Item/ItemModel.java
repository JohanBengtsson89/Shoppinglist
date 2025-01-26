package com.project.Shoppinglist.Item;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@AllArgsConstructor
@Getter
@Setter
public class ItemModel {

    @Id
    private Long id;
    private String itemName;
    private Date dateOfLastPurchase;

    private ItemModel(){};

}
