import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBrand, deleteBrands, editBrands, getBrandById, getBrands, searchBrand } from "../../api/Brand/BrandApi";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Skeleton,
  TextField,
  Tooltip,
} from "@mui/material";
import { Add, Close, Delete, Edit, MoreVert } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import {
  setIdx,
  setInpAddBrand,
  setInpEditBrand,
  setInpSearchBrand,
  setOpenModalBrand,
  setOpenModalEditBrand,
} from "../../reducers/Brand/Brand";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/// syle modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const Brand = () => {
  /// dispatch
  const dispatch = useDispatch();

  /// data
  const data = useSelector((store) => store.Brand.data);
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);
  const isLoading = useSelector((store) => store.Brand.isLoading);
  const skeleton = [1, 2, 3, 4, 5, 6];

  /// modal
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /// input search
  const inpSearchBrand = useSelector((store) => store.Brand.inpSearchBrand);

  /// modal
  const openModalAddBrand = useSelector(
    (store) => store.Brand.openModalAddBrand
  );

  /// inp brand add
  const inpAddBrands = useSelector((store) => store.Brand.inpAddBrands);

  // add brand
  const handleSubmitAddBrand = (event) => {
    event.preventDefault()
    const newBrand = new FormData()
    newBrand.append("BrandName", inpAddBrands)
    dispatch(addBrand(newBrand))
    dispatch(setOpenModalBrand())
  }

  /// idx
  const idx = useSelector((store) => store.Brand.idx)

  /// about dialog edit
  const openModalEditBrand = useSelector((store) => store.Brand.openModalEditBrand)
  const inpEditBrand = useSelector((store) => store.Brand.inpEditBrand)

  /// edit brand 
  const handleSubmitEditBrand = (event) => {
    event.preventDefault()
    const newEditedBrand = new FormData()
    newEditedBrand.append("Id", idx.id)
    newEditedBrand.append("BrandName", inpEditBrand)
    dispatch(editBrands(newEditedBrand))
    dispatch(setOpenModalEditBrand())
  }

  return (
    <>
      <div className="flex items-center justify-between flex-wrap">
        <h1 className="text-[20px] font-[600] lg:text-[30px]">Brands</h1>
        <div className="flex items-center gap-[20px]">
          <TextField
            label="Search brand"
            value={inpSearchBrand}
            onChange={(event) =>
              dispatch(setInpSearchBrand(event.target.value))
            }
            onInput={() => dispatch(searchBrand(inpSearchBrand))}
          />
          <Button
            onClick={() => dispatch(setOpenModalBrand())}
            variant="contained"
            startIcon={<Add />}
          >
            Add New
          </Button>
        </div>
      </div>
      <div className="py-[20px]">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading
                ? skeleton.map((elem) => {
                    return (
                      <StyledTableRow key={elem}>
                        <StyledTableCell component="th" scope="row">
                          <Skeleton variant="text" width={"100%"} height={50} />
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <Skeleton variant="text" width={"100%"} height={50} />
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                : data?.map((elem) => (
                    <StyledTableRow key={elem.id}>
                      <StyledTableCell
                        component="th"
                        sx={{
                          textDecorationLine: "underline",
                          cursor: "pointer",
                        }}
                        scope="row"
                      >
                        <Link
                          onClick={() => dispatch(getBrandById(elem.id))}
                          to={`brandById/${elem.id}`}
                        >
                          {elem?.brandName}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <React.Fragment>
                          <Tooltip title="Settings">
                            <IconButton
                              onClick={(event) => {handleClick(event); dispatch(setIdx(elem))}}
                              size="small"
                              sx={{ ml: 2 }}
                              aria-controls={open ? "account-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                            >
                              <MoreVert />
                            </IconButton>
                          </Tooltip>
                          <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                              elevation: 0,
                              sx: {
                                overflow: "visible",
                                filter:
                                  "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                  width: 32,
                                  height: 32,
                                  ml: -0.5,
                                  mr: 1,
                                },
                                "&::before": {
                                  content: '""',
                                  display: "block",
                                  position: "absolute",
                                  top: 0,
                                  right: 14,
                                  width: 10,
                                  height: 10,
                                  bgcolor: "background.paper",
                                  transform: "translateY(-50%) rotate(45deg)",
                                  zIndex: 0,
                                },
                              },
                            }}
                            transformOrigin={{
                              horizontal: "right",
                              vertical: "top",
                            }}
                            anchorOrigin={{
                              horizontal: "right",
                              vertical: "bottom",
                            }}
                          >
                            <MenuItem
                              onClick={() => dispatch(deleteBrands(idx.id))}
                              sx={{ display: "flex", gap: "10px" }}
                            >
                              <Delete color="error">
                                <PersonAdd />
                              </Delete>
                              Delete
                            </MenuItem>
                            <MenuItem
                              onClick={() => {dispatch(setOpenModalEditBrand()); dispatch(setInpEditBrand(idx.brandName))}}
                              sx={{ display: "flex", gap: "10px" }}
                            >
                              <Edit>
                                <Settings fontSize="small" />
                              </Edit>
                              Edit
                            </MenuItem>
                          </Menu>
                        </React.Fragment>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Modal
        open={openModalAddBrand}
        onClose={() => dispatch(setOpenModalBrand())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-between pb-[20px]">
            <p className="text-[18px]">Add Brand</p>
            <IconButton onClick={() => dispatch(setOpenModalBrand())}>
              <Close />
            </IconButton>
          </div>
          <form onSubmit={(event) => handleSubmitAddBrand(event)}>
            <TextField
              label="Name Brand"
              fullWidth
              name="name"
              className="name"
              id="name"
              required
              value={inpAddBrands}
              onChange={(event) => dispatch(setInpAddBrand(event.target.value))}
            />
            <div className="flex items-center justify-end gap-[20px] p-[10px]">
              <Button
                variant="outlined"
                onClick={() => dispatch(setOpenModalBrand())}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
      <Modal
        open={openModalEditBrand}
        onClose={() => dispatch(setOpenModalEditBrand())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-between pb-[20px]">
            <p className="text-[18px]">Add Brand</p>
            <IconButton onClick={() => dispatch(setOpenModalEditBrand())}>
              <Close />
            </IconButton>
          </div>
          <form onSubmit={(event) => handleSubmitEditBrand(event)}>
            <TextField
              label="Name Brand"
              fullWidth
              name="name"
              className="name"
              id="name"
              required
              value={inpEditBrand}
              onChange={(event) => dispatch(setInpEditBrand(event.target.value))}
            />
            <div className="flex items-center justify-end gap-[20px] p-[10px]">
              <Button
                variant="outlined"
                onClick={() => dispatch(setOpenModalEditBrand())}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Brand;
