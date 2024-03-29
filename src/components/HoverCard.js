import React, { useContext, useState } from 'react'
import "./HoverCard.css"
import { motion } from "framer-motion";
import displayPicture from '../images/stephen-a-smith-profile.jpg';
import { GlobalContext } from '../context/GlobalContext';
import { GoVerified } from "react-icons/go";

export const HoverCard = ({position, handleMouseLeave}) => {
    const { bio, followers, following, formatStats, name, handle, isVerified, isFollower, setIsFollower } = useContext(GlobalContext)
    const [isFollowingHovering, setIsFollowingHovering] = useState(false);
    const [isFollowersHovering, setIsFollowersHovering] = useState(false);
    const [followText, setFollowText] = useState("Following")

    const handleMouseOverStat = (element, setter) => {
        const div = document.getElementsByClassName(element);

        var timeout = setTimeout(() => {
            setter(true);
        }, 500);

        div.onmouseleave = () => {
            clearTimeout(timeout);
        }
    };

    const handleMouseLeaveStat = (element, setter) => {
        const div = document.getElementsByClassName(element);

        var timeout = setTimeout(() => {
            setter(false);
        }, 500);

        div.onmouseover = () => {
            clearTimeout(timeout);
        };
    };

    return (
        <motion.div className={"hoverCard__container " + position} onMouseLeave={handleMouseLeave}
        animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <div className="hoverCard__header">
                <img className="hoverCard__display-picture" alt="stephen-a-smith profile" src={displayPicture}/>
                <div className="hoverCard__name-verified">
                    <div className="card__header-name">{name}</div>
                    {isVerified && <GoVerified className="card__header-verified"/>}
                    <div className="card__header-text">{handle}</div>
                </div>
                <button 
                    className={"hoverCard__button " + (isFollower ? "hoverCard__following-button" : "hoverCard__follow-button")}
                    onClick={() => setIsFollower(!isFollower)}
                    onMouseOver={() => setFollowText("Unfollow")}
                    onMouseLeave={() => setFollowText("Following")}>{isFollower ? followText : "Follow"}</button>
            </div>
            <div className="hoverCard__bio">{bio}</div>
            <div className="hoverCard__stats">
                <span className="hoverCard__stats-element-following"
                        onMouseOver={() => handleMouseOverStat("hoverCard__stats-element-following", setIsFollowingHovering)}
                        onMouseLeave={() => handleMouseLeaveStat("hoverCard__stats-element-following", setIsFollowingHovering)}>
                            <span className="hoverCard__stats-value" >{formatStats(following)}</span> Following
                            {isFollowingHovering && <div className="app__small-text-hover-card">{following.toLocaleString()}</div>}
                </span>
                <span className="hoverCard__stats-element-followers"
                        onMouseOver={() => handleMouseOverStat("hoverCard__stats-element-followers", setIsFollowersHovering)}
                        onMouseLeave={() => handleMouseLeaveStat("hoverCard__stats-element-followers", setIsFollowersHovering)}>
                            <span className="hoverCard__stats-value" >{formatStats(followers)}</span> Followers
                            {isFollowersHovering && <div className="app__small-text-hover-card">{followers.toLocaleString()}</div>}
                </span>
                <span className="hoverCard__footer">Not followed by anyone you're following</span>

            </div>
            
        </motion.div>
    )
}
