package lk.mycode.shop.controller;

import lk.mycode.shop.dto.ShopDTO;
import lk.mycode.shop.entity.Shop;
import lk.mycode.shop.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("ishan/shops")
public class ShopController {

    @Autowired
    private ShopService shopService;

    @PostMapping("/submit")
    public boolean saveShop(@RequestBody ShopDTO shopDTO){
        shopService.saveShop(shopDTO);
        return true;
    }

    @GetMapping("/all")
    public List<ShopDTO> getAllShop(){
        return shopService.getAllShops();
    }

    @DeleteMapping("/{id}")
    public boolean deleteShop(@PathVariable("id") int id){
        shopService.deleteShop(id);
        return true;
    }

    @PutMapping("/{id}")
    public boolean updateShop(@PathVariable("id") int id, @RequestBody ShopDTO shopDTO){
        shopService.updateShop(id,shopDTO);
        return true;
    }

    @GetMapping("/{id}")
    public ShopDTO findShop(@PathVariable("id") int id){
        return shopService.findShop(id);
    }
}
