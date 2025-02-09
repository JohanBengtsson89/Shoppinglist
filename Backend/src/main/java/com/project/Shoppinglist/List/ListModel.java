package com.project.Shoppinglist.List;

import com.project.Shoppinglist.Item.ItemModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@Table(name = "shopping_list")
public class ListModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "list_id")
    private Long id;

    @Column(name = "list_name")
    private String listName;

// test
    /*@Column(name = "items")
    private List<ItemModel> item;*/

    public ListModel(){};

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }
}
