'use client'
import Button from '@mui/material/Button';
import { useState } from "react";
import useSignupModal from '@/app/hooks/useSignupModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from "next-auth/react";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SpotType } from '@/app/types';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { fetchCreateReview } from '@/app/actions/reviewActions';

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
    selectedSpotsCounter: number;
    setSelectedSpotsCounter: React.Dispatch<React.SetStateAction<number>>;
}

export function SelectedSpotButton({ 
    spotId, 
    isSelected, 
    setIsSelected, 
    selectedSpotsCounter, 
    setSelectedSpotsCounter,
}: SelectedSpotButtonProps) {

    const toggleSelected = () => {
        if (!isSelected) {
            setSelectedSpotsCounter(selectedSpotsCounter + 1);
        } else {
            setSelectedSpotsCounter(selectedSpotsCounter - 1);
        }

        setIsSelected(!isSelected);
    };

    const handleClick = async () => {
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


// interface SelectThumnailButtonProps {
//     spotId: number;
//     isSelected: boolean;
//     setIsSelected: (value: boolean) => void;
//     selectedSpotsCounter: number;
//     setSelectedSpotsCounter: React.Dispatch<React.SetStateAction<number>>;
// }

export function SelectThumnailButton() {

    const toggleSelected = () => {
        // if (!isSelected) {
        //     setSelectedSpotsCounter(selectedSpotsCounter + 1);
        // } else {
        //     setSelectedSpotsCounter(selectedSpotsCounter - 1);
        // }

        //setIsSelected(!isSelected);
    };

    const handleClick = async () => {
        // try {
        //     const response = await fetch('/api/updateSelected', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             spotId: spotId,
        //             selected: isSelected,
        //         }),
        //     });

        //     if (!response.ok) {
        //         throw new Error('selectedの更新に失敗しました。');
        //     }
        // } catch (error) {
        //     console.error('selectedの更新に失敗しました。', error);
        // }

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
                // backgroundColor: isSelected ? '#FF951C' : '#3BC1FF',
                backgroundColor: '#3BC1FF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1rem',
                '&:hover': {
                    // backgroundColor: isSelected ? '#E08718' : '#2FA8E6',
                    backgroundColor: '#2FA8E6',
                },
            }}
        >
            サムネイルに使用
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
                選択解除
            </Button>
        </div>
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
            setIsFirstRender(false);
            return;
        }

        window.location.href = `/map?startingPoint=${startingPoint}&isUserLocation=${isUserLocation}`;
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



export function MapSideBarBackButton() {
    return (
        <Button
            href="/top"
            variant='contained'
            sx={{
                width: '10rem',
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
            <ArrowBackIcon/>
            選択に戻る
        </Button>
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


type ReviewCreateBackButtonProps = {
    spotId: number;
};

export function ReviewCreateBackButton({ spotId }: ReviewCreateBackButtonProps) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/top/showReview/${spotId}`);
    };
    return (
        <Button
            onClick = {handleClick}
            sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.7rem", // 文字を大きく
                fontWeight: "bold",
                color: "#443322", // 文字色を青系に変更（お好みで）
                "& .MuiSvgIcon-root": {
                    fontSize: "2.7rem", // アイコンのサイズを大きく
                    fontWeight: "bold"
                }
            }}
        >
            <ArrowBackIcon/>
            戻る
        </Button>
    )
}


export function ReviewBackButton() {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/top`);
    };
    return (
        <Button
            onClick = {handleClick}
            sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.7rem",
                fontWeight: "bold",
                color: "#443322",
                "& .MuiSvgIcon-root": {
                    fontSize: "2.7rem",
                    fontWeight: "bold"
                }
            }}
        >
            <ArrowBackIcon/>
            戻る
        </Button>
    )
}


type ReviewCreateSendButtonProps = {
    spotId: number;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>; 
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ReviewCreateSendButton({ title, setTitle, content, setContent, spotId, setIsBlank }: ReviewCreateSendButtonProps) {
    const router = useRouter();
    const handleClick = async () => {
        console.log("送信");
        console.log(`スポットID:${spotId}`);
        console.log(`タイトル:${title}`);
        console.log(`コンテント:${content}`);

        if (title == "" || content == "") {
            setIsBlank(true);
        } else {
            try {
                const fetchedCreateReview = await fetchCreateReview(title, content, spotId);
                if (fetchedCreateReview) {
                    console.log("成功");
                    toast.success("投稿しました！！")
                    router.push(`/top/showReview/${spotId}`)
                    setTitle("");
                    setContent("");
                } else {
                    throw new Error('createReviewが失敗しました。');
                }
            } catch (error) {
                console.error('createReviewに失敗しました。',error);
                toast.error("エラーが発生しました。")
            }
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
            はい
        </Button>
    )
}


type PushCreatePageButtonProps = {
    spotId: number;
}

export function PushCreatePageButton({ spotId }: PushCreatePageButtonProps) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/top/createReview/${spotId}`);
    };

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
            投稿する
        </Button>
    )

}


type ModalCloseButtonProps = {
    handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ModalCloseButton( {handleClose}: ModalCloseButtonProps) {
    return (
        <Button
            onClick={handleClose}
            sx = {{
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
            いいえ
        </Button>
    )
}

type ConfirmMapButtonProps = {
    startingPoint: number;
    selectedSpots: { [key: number]: boolean };
    selectedSpotsCounter: number;
    setIsFirstRender: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ConfirmMapButton({
    startingPoint,
    selectedSpotsCounter,
    setIsFirstRender,
}: ConfirmMapButtonProps) {
    const isUserLocation = false;
    const handleClick = () => {
        if (selectedSpotsCounter === 0) {
            setIsFirstRender(false);
            return;
        }

        window.location.href = `/recommendRoute/confirmMap?startingPoint=${startingPoint}&isUserLocation=${isUserLocation}`;
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
            MAP画面で確認
        </Button>
    );
}


export function DecideRouteButton() {
    return (
        <Button
            href="/recommendRoute/postRecommend"
            variant='contained'
            sx={{
                width: '10rem',
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
            ルートを確定
        </Button>
    );
}


type RecommendRouteSendButtonProps = {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>; 
    explanation: string;
    setExplanation: React.Dispatch<React.SetStateAction<string>>;
    nearStation: number;
    setNearStation: React.Dispatch<React.SetStateAction<number>>;
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RecommendRouteSendButton({ title, setTitle, explanation, setExplanation, nearStation, setNearStation, setIsBlank }: RecommendRouteSendButtonProps) {
    const router = useRouter();
    const handleClick = async () => {
        console.log("送信");
        console.log(`タイトル:${title}`);
        console.log(`コンテント:${explanation}`);

        if (title == "" || explanation == "") {
            setIsBlank(true);
        } else {
            try {
                //const fetchedCreateReview = await fetchCreateReview(title, explanation, nearStation);
                // if (fetchedCreateReview) {
                //     console.log("成功");
                //     toast.success("投稿しました！！")
                //     //router.push(`/top/showReview/${spotId}`)
                     setTitle("");
                     setExplanation("");
                     setNearStation(0);
                // } else {
                //     throw new Error('createReviewが失敗しました。');
                // }
            } catch (error) {
                console.error('createReviewに失敗しました。',error);
                toast.error("エラーが発生しました。")
            }
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
            はい
        </Button>
    )
}
