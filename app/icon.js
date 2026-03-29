import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: '#FFFBF5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <span
          style={{
            color: '#B45309',
            fontSize: 19,
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          M
        </span>
        <div
          style={{
            width: 10,
            height: 2,
            borderRadius: 1,
            background: '#C2410C',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
