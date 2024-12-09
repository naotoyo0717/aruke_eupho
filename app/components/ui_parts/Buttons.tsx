'use client'
import Button from '@mui/material/Button';
import { useState } from "react";
import useSignupModal from '@/app/hooks/useSignupModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from "next-auth/react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SpotType } from '@/app/types';
import { useRouter } from 'next/navigation';

export function SignupButton() {
    const [isOpen, setIsOpen] = useState(false);
    const signupModal = useSignupModal();
    return (
        <Button
            variant="contained"
            onClick={() => {
                signupModal.onOpen();
                setIsOpen(!isOpen);
            }}
            sx={{
                width: '13rem',
                height: '4rem',
                borderRadius: '10px',
                backgroundColor: '#3BC1FF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1.2rem', 
                '&:hover': {
                    backgroundColor: '#35A8E0',
                },
            }}>
            サインアップ
        </Button>
    );
}

export function LoginButton() {
    const [isOpen, setIsOpen] = useState(false);
    const loginModal = useLoginModal()
    return (
        <Button
            variant="contained"
            onClick={() => {
                loginModal.onOpen()
                setIsOpen(!isOpen);
            }}
            sx={{
                width: '13rem',
                heiht: '4rem',
                borderRadius: '10px',
                backgroundColor: '#3BC1FF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1.2rem', 
                '&:hover': {
                    backgroundColor: '#35A8E0',
                },
            }}>
            ログイン
        </Button>
    );
}

export function LogoutButton() {
    return (
        <Button
            variant="contained"
            onClick={() => {
                signOut()
            }}
            sx={{
                width: '13rem',
                height: '4rem',
                borderRadius: '10px',
                backgroundColor: '#3BC1FF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1.2rem', 
                '&:hover': {
                    backgroundColor: '#35A8E0',
                },
            }}>
            ログアウト
        </Button>
    );
}

interface SelectedSpotButtonProps {
    spotId: number;
    isSelected: boolean;
    setIsSelected: (value: boolean) => void;
}

export function SelectedSpotButton({ spotId, isSelected, setIsSelected,}: SelectedSpotButtonProps) {

    const toggleSelected = () => {
        setIsSelected(!isSelected);
    }
    const handleClick = async () => { // 修正済み

        try {
            const response = await fetch('/api/updateSelected', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    spotId: spotId,
                    selected: isSelected,
                }),
            });
            
            if (!response.ok) {
                throw new Error('selectedの更新に失敗しました。');
            }
        } catch (error) {
            console.error('selectedの更新に失敗しました。', error);
        }
        toggleSelected();
    };

    return (
        <Button
            variant="contained"
            onClick={handleClick}
            sx={{
                width: '10rem',
                height: '3rem',
                borderRadius: '10px',
                backgroundColor: isSelected ? '#FF951C' : '#3BC1FF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1rem',
                '&:hover': {
                    backgroundColor: isSelected ? '#E08718' : '#2FA8E6',
                },
            }}
        >
            {isSelected ? 'ルートから削除' : 'ルートに追加'}
        </Button>
    );
}


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
                全削除
            </Button>
        </div>
    );
}

type OpenMapButtonProps = {
    startingPoint: number;
    // setStartingPoint: React.Dispatch<React.SetStateAction<number>>;
};

export function OpenMapButton({
    startingPoint,
}: OpenMapButtonProps) {
    const router = useRouter()
    return (
        <Button
            variant="contained"
            onClick={() => {
                router.push(`/map?startingPoint=${startingPoint}`);
            }}
            sx={{
                width: '9rem',
                height: '3rem',
                borderRadius: '10px',
                backgroundColor: '#3BC1FF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1.2rem', 
                '&:hover': {
                    backgroundColor: '#35A8E0',
                },
            }}>
            MAPへ
        </Button>
    );
}


interface FilterSpotButtonProps {
    setSpots: React.Dispatch<React.SetStateAction<SpotType[]>>;
};

export function FilterSpotButton({setSpots}: FilterSpotButtonProps) {
    const [filter, setFilter] = useState<string>('');
  
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
    StartingPoint: number;
    setStartingPoint: React.Dispatch<React.SetStateAction<number>>;
};

export function SelectStartingButton({
    StartingPoint,
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
          value={String(StartingPoint)} // 数値を文字列に変換して設定
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