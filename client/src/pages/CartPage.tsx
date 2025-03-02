import { useCookies } from "react-cookie";
import { ProductType } from "../types";
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../components/cart";

const CartPage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["cart"]);

  const cartItems = (cookies.cart as ProductType[]) || null;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePurchaseProduct = (event: React.FormEvent) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handlePushHomePage = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              장바구니
            </Typography>
            {!cartItems || cartItems.length === 0 ? (
              <Typography variant="body1">
                장바구니에 담긴 상품이 없습니다.
              </Typography>
            ) : (
              cartItems?.map((cart) => <CartItem key={cart.id} cart={cart} />)
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              결제 정보
            </Typography>
            <Box sx={{ positin: "sticky", top: 20 }}>
              <Card sx={{ padding: 2 }}>
                <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                  총 상품 가격 : 0원
                </Typography>
                <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                  배송비 : 평생무료
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  총 결제 금액 : 0원
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handlePurchaseProduct}
                >
                  결제하기
                </Button>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Dialog
        open={isModalOpen}
        onClose={handlePushHomePage}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          성공적으로 구매했습니다.
        </DialogTitle>
        <DialogContent>
          <DialogContentText>메인 페이지로 이동합니다.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePushHomePage} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CartPage;
