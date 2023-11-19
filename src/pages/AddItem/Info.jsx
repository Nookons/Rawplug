import React from 'react';

const Info = () => {
    return (
        <div>
            <article>Used - <span>This status when item used</span></article>
            <hr/>
            <article>Available - <span>This status means that the item is prepared for the task</span></article>
            <hr/>
            <article>Hold - <span>Indicates that it is temporarily frozen or held for use.</span></article>
        </div>
    );
};

export default Info;