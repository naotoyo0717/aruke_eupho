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
                width: '12rem',
                height: '2rem',
                borderRadius: '6px',
                backgroundColor: isUserLocation ? '#FF951C' : '#3BC1FF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1rem',
                '&:hover': {
                    backgroundColor: isUserLocation ? '#E08718' : '#2FA8E6',
                },
            }}
        >
            現在地の表示：{isUserLocation ? 'ON' : 'OFF'}
        </Button>
    );
}



type OpenMapButtonProps = {
    startingPoint: number;
    selectedSpots: { [key: number]: boolean };
    selectedSpotsCounter: number;
    setIsFirstRender: React.Dispatch<React.SetStateAction<boolean>>;
    isUserLocation: boolean;
};

export function OpenMapButton({
    startingPoint,
    selectedSpotsCounter,
    setIsFirstRender,
    isUserLocation
}: OpenMapButtonProps) {
    const handleClick = () => {
        if (selectedSpotsCounter === 0) {
            setIsFirstRender(true);
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
            }}
        >
            MAPへ
        </Button>
    );
}





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
            sx={{ m: 1, minWidth: 140 }} 
            size="small" // サイズを小さく設定
        >
            <InputLabel 
                id="filterSpotLabel" 
                sx={{
                backgroundColor: '#faf6f0',
                px: 1, // ラベル内の左右の余白を調整
                transform: 'translate(14px, -6px) scale(0.75)', // ラベル位置を微調整
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
                    padding: '8px', // 内側の余白を調整
                },
            }}
        >
            <MenuItem value="0">全て</MenuItem>
            <MenuItem value="1">定番</MenuItem>
            <MenuItem value="2">未チェック</MenuItem>
            <MenuItem value="3">チェック済み</MenuItem>
            <MenuItem value="4">京阪宇治近辺</MenuItem>
            <MenuItem value="5">JR宇治近辺</MenuItem>
            <MenuItem value="6">京阪黄檗近辺</MenuItem>
            <MenuItem value="7">京阪六地蔵</MenuItem>
            <MenuItem value="8">その他</MenuItem>
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
          value={String(startingPoint)} // 数値を文字列に変換して設定
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
            現在地
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
