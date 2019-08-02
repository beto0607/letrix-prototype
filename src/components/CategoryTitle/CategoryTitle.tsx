import React from "react";

import styles from '../Board/board.module.scss';

interface CategoryProps {
    name: string;
}

export const CategoryTitle: React.FC<CategoryProps> = ({ name }: CategoryProps) => {
    return (
        <div>
            {name}
        </div>
    )
}