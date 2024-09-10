package Utils;

import org.testng.annotations.DataProvider;

public class TradeDataProvider {

    @DataProvider(name = "TradeData")
    public static Object[][] getTradeData() {
        return new Object[][]{
                {"Branch1", "100", "200"},
                {"Branch2", "150", "300"},
                {"Branch3", "200", "400"},
                {"Branch4", "250", "500"},
                {"Branch5", "300", "600"},
                {"Branch6", "350", "700"},
                {"Branch7", "400", "800"},
                {"Branch8", "450", "900"},
                {"Branch9", "500", "1000"},
                {"Branch10", "550", "1100"}
        };
    }
}
