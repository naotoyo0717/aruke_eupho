'use client'

import { SpotType } from "@/app/types";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export function ResetSelectionButton() {

    const handleClick = async () => {
        try {
            const response = await fetch('/api/resetSelected', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'リセットに失敗しました。');
            }

            const result = await response.json();
            console.log('リセット成功:', result);

        } catch (error) {
            console.error('APIエラー:', error);
        } 
        window.location.reload()
    };

    return (
        <div>
            <Button
                onClick={handleClick}
                variant="contained"
                sx={{
                    width: '7rem',
                    height: '2rem',
                    borderRadius: '6px',
                    backgroundColor: '#FF951C',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    '&:hover': {
                        backgroundColor: '#E08718',
                    },
                    '@media (max-width: 600px)': {
                        width: '3.5rem',
                        height: '1.2rem',
                        fontSize: '0.6rem',
                        padding: '2px 2px',
                        minWidth: 'unset',
                    },
                }}
            >
                選択解除
            </Button>
        </div>
    );
}


type IsUserLocationButtonProps = {
    isUserLocation: boolean;
    setIsUserLocation: React.Dispatch<React.SetStateAction<boolean>>;
};

export function IsUserLocationButton({ isUserLocation, setIsUserLocation }: IsUserLocationButtonProps) {
    const handleClick = () => {
        setIsUserLocation(!isUserLocation);
    };

    return (
        <Button
            onClick={handleClick}
            variant="contained"
            sx={{
                width: '9rem',
                height: '2rem',
                borderRadius: '6px',
                backgroundColor: isUserLocation ? '#FF951C' : '#3BC1FF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1rem',
                '&:hover': {
                    backgroundColor: isUserLocation ? '#E08718' : '#2FA8E6',
                },
                '@media (max-width: 600px)': {
                    width: '4.5rem',
                    height: '1.2rem',
                    fontSize: '0.6rem',
                    padding: '2px 2px',
                    minWidth: 'unset',
                },
            }}
        >
            現在地：{isUserLocation ? 'ON' : 'OFF'}
        </Button>
    );
}



type OpenMapButtonProps = {
    startingPoint: number;
    selectedSpots: { [key: number]: boolean };
    selectedSpotsCounter: number;
    setIsFirstRender: React.Dispatch<React.SetStateAction<boolean>>;
    isUserLocation: boolean;
    setNotOpenMap: React.Dispatch<React.SetStateAction<boolean>>;
};

export function OpenMapButton({
    startingPoint,
    selectedSpotsCounter,
    setIsFirstRender,
    isUserLocation,
    setNotOpenMap
}: OpenMapButtonProps) {
    const handleClick = () => {
        if (selectedSpotsCounter === 0 || selectedSpotsCounter >= 25) {
            setIsFirstRender(true);
            setNotOpenMap(true);
            return;
        } else {
            window.location.href = `/map?startingPoint=${startingPoint}&isUserLocation=${isUserLocation}`;
        }
    }

    return (
        <Button
            variant="contained"
            onClick={handleClick}
            sx={{
                width: "9rem",
                height: "3rem",
                borderRadius: "10px",
                backgroundColor: "#3BC1FF",
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "1.2rem",
                "&:hover": {
                    backgroundColor: "#35A8E0",
                },
                '@media (max-width: 600px)': {
                    width: '4rem',
                    height: '1.5rem',
                    fontSize: '0.6rem',
                    borderRadius: "5px",
                    padding: '2px 2px',
                    minWidth: 'unset',
                },
            }}
        >
            MAPへ
        </Button>
    );
}


const menuItemStyle = {
    '@media (max-width: 600px)': {
        fontSize: '0.7rem',
    },
};

interface FilterSpotButtonProps {
    setSpots: React.Dispatch<React.SetStateAction<SpotType[]>>;
};

export function FilterSpotButton({setSpots}: FilterSpotButtonProps) {
    const [filter, setFilter] = useState<string>('0');
  
    const handleChange = async (event: SelectChangeEvent<string>) => {
      const selectedFilter = event.target.value;
      setFilter(selectedFilter);
  
      try {
        const response = await fetch(`/api/getFilterSpots?filter=${selectedFilter}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '絞り込みに失敗しました。');
        }
        
        const result = await response.json();
        console.log('絞り込み成功:', result);
        setSpots(result);
      } catch (error) {
        console.error('APIエラー:', error);
      }
    };
  
    return (
        <FormControl 
            sx={{
                m: 1,
                width: '9rem',
                '@media (max-width: 600px)': {
                    width: '5rem',
                    fontSize: '0.6rem',
                    borderRadius: "5px",
                },
            }}
        >
            <InputLabel 
                id="filterSpotLabel" 
                sx={{
                    backgroundColor: '#faf6f0',
                    px: 1,
                    transform: 'translate(14px, -6px) scale(0.75)',
                    '@media (max-width: 600px)': {
                        fontSize: '0.7rem',
                    },
                }}
            >
            絞り込み
        </InputLabel>
        <Select
            labelId="filterSpotLabel"
            id="filterSpot"
            value={filter}
            label="Spot"
            onChange={handleChange}
                sx={{
                    '& .MuiSelect-select': {
                        padding: '8px',
                        '@media (max-width: 600px)': {
                            padding: '0.5px',
                            height: '0.1rem',
                            fontSize: '0.6rem',
                        },
                    },
                }}
        >
            <MenuItem value="0" sx={menuItemStyle}>全て</MenuItem>
            <MenuItem value="1" sx={menuItemStyle}>定番</MenuItem>
            <MenuItem value="2" sx={menuItemStyle}>未チェック</MenuItem>
            <MenuItem value="3" sx={menuItemStyle}>チェック済み</MenuItem>
            <MenuItem value="4" sx={menuItemStyle}>京阪宇治</MenuItem>
            <MenuItem value="5" sx={menuItemStyle}>JR宇治</MenuItem>
            <MenuItem value="6" sx={menuItemStyle}>京阪黄檗</MenuItem>
            <MenuItem value="7" sx={menuItemStyle}>京阪六地蔵</MenuItem>
            <MenuItem value="8" sx={menuItemStyle}>JR京都</MenuItem>
            <MenuItem value="9" sx={menuItemStyle}>その他</MenuItem>
        </Select>
        </FormControl>

        );
    }




type SelectStartingButtonProps = {
    startingPoint: number;
    setStartingPoint: React.Dispatch<React.SetStateAction<number>>;
};

export function SelectStartingButton({
    startingPoint,
    setStartingPoint,
  }: SelectStartingButtonProps) {
    const handleChange = (event: SelectChangeEvent<string>) => {
      const selectedStartingPoint = parseInt(event.target.value, 10);
      setStartingPoint(selectedStartingPoint);
    };
  
    return (
      <FormControl
        sx={{
            m: 1,
            width: '9rem',
            '@media (max-width: 600px)': {
                    width: '5rem',
                    fontSize: '0.6rem',
                    borderRadius: "5px",
                },
        }}
      >
        <InputLabel
          id="selectStartingPoint"
          sx={{
            backgroundColor: "#faf6f0",
            px: 1,
            transform: "translate(14px, -6px) scale(0.75)",
            '@media (max-width: 600px)': {
                fontSize: '0.7rem',
            },
          }}
        >
          出発地点
        </InputLabel>
        <Select
          labelId="startingSpotLabel"
          id="startingSpot"
          value={String(startingPoint)} // 数値を文字列に変換して設定
          label="Spot"
          onChange={handleChange}
          sx={{
            "& .MuiSelect-select": {
                padding: "8px",
                '@media (max-width: 600px)': {
                    padding: '0.5px',
                    height: '0.1rem',
                    fontSize: '0.6rem',
                },
            },
          }}
        >
            <MenuItem value="0" sx={menuItemStyle}>現在地</MenuItem>
            <MenuItem value="1" sx={menuItemStyle}>京阪宇治</MenuItem>
            <MenuItem value="2" sx={menuItemStyle}>京阪黄檗</MenuItem>
            <MenuItem value="3" sx={menuItemStyle}>京阪六地蔵</MenuItem>
            <MenuItem value="4" sx={menuItemStyle}>JR宇治駅</MenuItem>
            <MenuItem value="5" sx={menuItemStyle}>JR京都駅</MenuItem>
        </Select>
      </FormControl>
    );
  }



type TransportOptionButtonProps = {
    transportOption: number;
    setTransportOption: React.Dispatch<React.SetStateAction<number>>;
};
    
export function TransportOptionButton({
    transportOption,
    setTransportOption,
    }: TransportOptionButtonProps) {
    const handleChange = (event: SelectChangeEvent<string>) => {
        const selectedTransport = parseInt(event.target.value, 10);
        setTransportOption(selectedTransport);
    };
    
    return (
        <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
        <InputLabel
            id="selectTransPort"
            sx={{
            backgroundColor: "#faf6f0",
            px: 1,
            transform: "translate(14px, -6px) scale(0.75)",
            }}
        >
            出発地点
        </InputLabel>
        <Select
            labelId="transportOptionLabel"
            id="transportOption"
            value={String(transportOption)} // TransportOptionを使用
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
                徒歩
            </MenuItem>
            <MenuItem value="1" sx={{ textAlign: "center" }}>
                公共交通機関
            </MenuItem>
            <MenuItem value="2" sx={{ textAlign: "center" }}>
                車
            </MenuItem>
            <MenuItem value="3" sx={{ textAlign: "center" }}>
                自転車
            </MenuItem>
        </Select>
        </FormControl>
    );
}
