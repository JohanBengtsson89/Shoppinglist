package com.project.Shoppinglist.Item;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.Shoppinglist.List.ListModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "items")
public class ItemModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "item_name")
    private String itemName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date_of_last_purchase")
    private LocalDate dateOfLastPurchase;

    @ManyToOne
    @JoinColumn(name = "shopping_list_id")
    @JsonBackReference
    private ListModel shoppingList;
}
