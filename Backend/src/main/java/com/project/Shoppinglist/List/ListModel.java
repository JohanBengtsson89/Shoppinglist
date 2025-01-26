package com.project.Shoppinglist.List;

import com.project.Shoppinglist.Item.ItemModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class ListModel {

    @Id
    @Column(name = "list_id")
    private Long id;

    @Column(name = "list_name")
    private String listName;

    @ManyToMany
    @Column(name = "items")
    private List<ItemModel> item;

    private ListModel(){};



}
