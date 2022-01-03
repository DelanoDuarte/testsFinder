import { AppBar, IconButton, styled, Toolbar } from "@mui/material";
import PropTypes from "prop-types";
import { Menu } from "@mui/icons-material";

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const AppNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  return (
    <>
      <NavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <Menu fontSize="small" />
          </IconButton>
        </Toolbar>
      </NavbarRoot>
    </>
  );
};

NavbarRoot.propTypes = {
  onSidebarOpen: PropTypes.func,
};
