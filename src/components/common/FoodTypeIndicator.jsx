import { Box } from "@mui/material";

const colors = {
  VEG: "#008000",
  NON_VEG: "#D32F2F",
  EGG: "#F9A825",
};

function FoodTypeIndicator({ foodType }) {
  return (
    <Box
      sx={{
        width: 18,
        height: 18,
        border: `2px solid ${colors[foodType]}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 0.5,
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: colors[foodType],
        }}
      />
    </Box>
  );
}

export default FoodTypeIndicator;
