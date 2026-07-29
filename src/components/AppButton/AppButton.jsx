import Button from "@mui/material/Button";

function AppButton({ children, loading = false, ...props }) {
  return (
    <Button variant='contained' disabled={loading} {...props}>
      {loading ? "Loading..." : children}
    </Button>
  );
}

export default AppButton;
