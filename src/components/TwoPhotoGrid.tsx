/**
 * 雙圖網格：兩張照片統一 4:3 比例、object-cover 填滿，保留圖片說明。
 * 適用於最新消息內有兩張照片的文章。
 */
interface TwoPhotoGridProps {
  leftSrc: string;
  leftAlt: string;
  leftCaption: string;
  rightSrc: string;
  rightAlt: string;
  rightCaption: string;
}

export function TwoPhotoGrid({
  leftSrc,
  leftAlt,
  leftCaption,
  rightSrc,
  rightAlt,
  rightCaption,
}: TwoPhotoGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 my-4">
      <figure className="m-0">
        <div className="overflow-hidden rounded-lg aspect-[4/3] bg-slate-100">
          <img
            src={leftSrc}
            alt={leftAlt}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <figcaption className="text-center text-slate-500 italic mt-2">
          {leftCaption}
        </figcaption>
      </figure>
      <figure className="m-0">
        <div className="overflow-hidden rounded-lg aspect-[4/3] bg-slate-100">
          <img
            src={rightSrc}
            alt={rightAlt}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <figcaption className="text-center text-slate-500 italic mt-2">
          {rightCaption}
        </figcaption>
      </figure>
    </div>
  );
}
