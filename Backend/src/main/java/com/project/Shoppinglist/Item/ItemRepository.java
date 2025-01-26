package com.project.Shoppinglist.Item;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<ItemModel, Long> {

}
