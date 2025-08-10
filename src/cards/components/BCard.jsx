import { Card, CardMedia, useTheme, useMediaQuery } from "@mui/material";
import BCardBody from "./BCardBody";
import BCardFooter from "./BCardFooter";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesDict";

function BCard({ card, toggleLike, onCardDeleted, onEditClick, disableActions = false }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleClick = () => {
    navigate(ROUTES.bcardsPage, { state: { card } });
  };

  const handleEditClick = (cardToEdit) => {
    if (onEditClick) {
      onEditClick(cardToEdit);
    }
  };

  const getCardDimensions = () => {
    if (isMobile) {
      return {
        width: '100%',
        maxWidth: 280,
        height: 'auto',
        minHeight: 320
      };
    }
    if (isTablet) {
      return {
        width: '100%',
        maxWidth: 240,
        height: 'auto',
        minHeight: 350
      };
    }
    return {
      width: '100%',
      maxWidth: 300,
      height: 'auto',
      minHeight: 380
    };
  };

  const getImageHeight = () => {
    if (isMobile) return 160;
    if (isTablet) return 170;
    return 190;
  };

  const cardDimensions = getCardDimensions();

  return (
    <Card sx={{
      ...cardDimensions,
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[8],
        cursor: 'pointer'
      },
      overflow: 'hidden',
      mx: { xs: 'auto', sm: 0 }
    }}>
      <CardMedia
        sx={{
          height: getImageHeight(),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          '&:hover': {
            cursor: 'pointer',
            opacity: 0.9
          },
          flexShrink: 0
        }}
        image={card.image.url}
        title="Business logo"
        onClick={handleClick}
      />

      <BCardBody
        title={card.title}
        subtitle={card.subtitle}
        bizNumber={card.bizNumber}
        phone={card.phone}
        city={card.address.city}
        onClick={handleClick}
      />

      <BCardFooter
        toggleLike={toggleLike}
        cardId={card._id}
        likes={card.likes}
        onCardDeleted={onCardDeleted}
        card={card}
        onEditClick={handleEditClick}
        disableActions={disableActions}
        isMobile={isMobile}
      />
    </Card>
  );
}

export default BCard;