import { type FC } from 'react'
import { CommunityCardsProps } from './CommunityCard.type';
import "./CommunityCard.scss";

const CommunityCards: FC<CommunityCardsProps> = ({ cards }) => {
  return (
    <div className="community">
      {cards?.map((card, index) => (
        <div
          key={index}
          className="w-5 h-10 border-s-black bg-white"
        >
          {card}
        </div>
      ))}
    </div>
  );
}

export default CommunityCards
