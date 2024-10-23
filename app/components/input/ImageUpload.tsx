'use client'

import { useCallback } from 'react'
import { CldUploadWidget, CloudinaryUploadWidgetResults, } from 'next-cloudinary'
import { TbPhotoPlus } from 'react-icons/tb'
import Image from 'next/image'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-var
  var cloudinary: any
}

type ImageUploadProps = {
  onChange: (value: string) => void
  value: string
}

// 画像アップロード
const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: CloudinaryUploadWidgetResults) => {
      // result.infoがCloudinaryUploadWidgetInfo型であることを確認
      if (typeof result.info !== 'string' && result.info?.secure_url) {
        const secureUrl = result.info.secure_url
        console.log(secureUrl)
        onChange(secureUrl)
      }
    },
    [onChange]
  )

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_UPLOAD_PRESET}
      options={{
        maxFiles: 1,
        sources: ['local'],
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative flex h-80 cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 transition hover:opacity-70"
          >
            <TbPhotoPlus size={50} />
            <div className="text-sm font-semibold">画像をアップロード</div>

            {value && (
              <div className="absolute inset-0 h-full w-full">
                <Image src={value} className="object-cover" alt="image" fill />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload
