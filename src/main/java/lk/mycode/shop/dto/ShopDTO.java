package lk.mycode.shop.dto;

public class ShopDTO {

    private int id;
    private String name;
    private String address;
    private String mobileNo;

    public ShopDTO() {
    }

    public ShopDTO(int id,String address, String mobileNo, String name) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.mobileNo = mobileNo;
    }

    public ShopDTO(String address, String mobileNo, String name) {
        this.name = name;
        this.address = address;
        this.mobileNo = mobileNo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }
}
