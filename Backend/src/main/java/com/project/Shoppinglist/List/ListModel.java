package com.project.Shoppinglist.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.project.Shoppinglist.Item.ItemModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "shopping_list")
public class ListModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "list_id")
    private Long id;

    @Column(name = "list_name")
    private String listName;

    @OneToMany(mappedBy = "shoppingList", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ItemModel> items;

    public void addItem(ItemModel item) {
        items.add(item);
        item.setShoppingList(this);
    }

}

