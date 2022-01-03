import { Home, Place, Store } from "@mui/icons-material";
import { Box, Divider, Drawer, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { NavItem } from "./NavItem";

const items = [
  {
    href: "/",
    icon: <Home fontSize="small" />,
    title: "Home",
  },
  {
    href: "/app/place",
    icon: <Store fontSize="small" />,
    title: "Available Places",
  },
  {
    href: "/app/place/map",
    icon: <Place fontSize="small" />,
    title: "Places Map",
  },
];

export const AppSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <Link href="/" passHref>
              <a>
                {/* <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                /> */}
              </a>
            </Link>
          </Box>
          <Box sx={{ px: 2 }}></Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

AppSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
