import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import PropTypes from "prop-types";

const InformationCard = ({
  title,
  amount,
  bgColor,
  avatarIcon,
  avatarColor,
}) => {
  return (
    <Card sx={{ backgroundColor: bgColor, color: "black" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {amount}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: avatarColor,
                height: 56,
                width: 56,
              }}
            >
              {avatarIcon}
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

InformationCard.propTypes = {
  title: PropTypes.string,
  amount: PropTypes.number,
  avatarIcon: PropTypes.object,
  avatarColor: PropTypes.string,
  bgColor: PropTypes.string,
};

InformationCard.defaultProps = {
  avatarColor: grey[100],
  bgColor: "white",
};

export default InformationCard;
