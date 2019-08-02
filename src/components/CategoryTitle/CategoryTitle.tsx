import React from "react";

import styles from './category_title.module.scss';

interface CategoryProps {
    name: string;
}

export const CategoryTitle: React.FC<CategoryProps> = ({ name }: CategoryProps) => {
    return (
        <div className={styles['category-title-wrapper']}>
            Categoría: <strong>{name.toUpperCase()}</strong>
        </div>
    )
}