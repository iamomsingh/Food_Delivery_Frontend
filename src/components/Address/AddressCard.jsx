import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";

function AddressCard({ address, selected, onSelect, onEdit, onDelete }) {
  return (
    <Card
      elevation={0}
      onClick={() => onSelect(address.id)}
      sx={{
        cursor: "pointer",
        border: "2px solid",
        borderColor: selected ? "primary.main" : "divider",
        borderRadius: 3,
        transition: "0.2s",

        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <CardContent>
        <Stack direction='row' spacing={2} alignItems='flex-start'>
          <Box sx={{ pt: 0.25 }}>
            {selected ? (
              <CheckCircleIcon color='primary' />
            ) : (
              <RadioButtonUncheckedIcon color='disabled' />
            )}
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              flexWrap='wrap'
            >
              <Typography variant='h6' fontWeight={700}>
                {address.label}
              </Typography>

              {address.isDefault && (
                <Chip label='Default' size='small' color='primary' />
              )}
            </Stack>

            <Typography variant='body1' sx={{ mt: 1 }}>
              {address.address}
            </Typography>

            {address.landmark && (
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ mt: 0.5 }}
              >
                Near {address.landmark}
              </Typography>
            )}

            <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
              {address.city}, {address.state} - {address.pinCode}
            </Typography>

            <Typography variant='body2' color='text.secondary'>
              {address.country}
            </Typography>

            {/* Actions */}

            <Stack direction='row' spacing={1} sx={{ mt: 2 }}>
              <Button
                size='small'
                startIcon={<EditOutlinedIcon />}
                onClick={(event) => {
                  event.stopPropagation();
                  onEdit(address);
                }}
              >
                Edit
              </Button>

              <Button
                size='small'
                color='error'
                startIcon={<DeleteOutlineIcon />}
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete(address);
                }}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default AddressCard;
