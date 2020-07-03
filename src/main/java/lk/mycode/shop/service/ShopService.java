package lk.mycode.shop.service;

import lk.mycode.shop.dto.ShopDTO;

import java.util.List;


public interface ShopService {

    public void saveShop(ShopDTO dto);

    public List<ShopDTO> getAllShops();

    public void updateShop(int id,ShopDTO dto);

    public void deleteShop(int id);

    public ShopDTO findShop(int id);

}
