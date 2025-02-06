import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

type SelectNearStationButtonProps = {
    nearStation: number;
    setNearStation: React.Dispatch<React.SetStateAction<number>>;
};

export function SelectNearStationButton({
    nearStation,
    setNearStation,
  }: SelectNearStationButtonProps) {
    const handleChange = (event: SelectChangeEvent<string>) => {
      const selectedNearStation = parseInt(event.target.value, 10);
      setNearStation(selectedNearStation);
    };
  
    return (
      <FormControl
        sx={{ m: 1, minWidth: 140 }}
        size="small"
      >
        <InputLabel
          id="selectStartingPoint"
          sx={{
            backgroundColor: "#faf6f0",
            px: 1,
            transform: "translate(14px, -6px) scale(0.75)",
          }}
        >
          出発地点
        </InputLabel>
        <Select
          labelId="startingSpotLabel"
          id="startingSpot"
          value={String(nearStation)} // 数値を文字列に変換して設定
          label="Spot"
          onChange={handleChange}
          sx={{
            "& .MuiSelect-select": {
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
          }}
        >
          <MenuItem value="0" sx={{ textAlign: "center" }}>
            未選択
          </MenuItem>
          <MenuItem value="1" sx={{ textAlign: "center" }}>
            京阪宇治
          </MenuItem>
          <MenuItem value="2" sx={{ textAlign: "center" }}>
            京阪黄檗
          </MenuItem>
          <MenuItem value="3" sx={{ textAlign: "center" }}>
            京阪六地蔵
          </MenuItem>
          <MenuItem value="4" sx={{ textAlign: "center" }}>
            JR宇治駅
          </MenuItem>
          <MenuItem value="5" sx={{ textAlign: "center" }}>
            JR京都駅
          </MenuItem>
        </Select>
      </FormControl>
    );
  }