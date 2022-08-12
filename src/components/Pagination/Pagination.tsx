import React from "react"
import styles from "./Pagination.module.css"

type PropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page: number) => void
    setCurrentPortion: (currentPortion: number) => void
    currentPortion: number
    portionSize?: number
}

export const Pagination = ({
                               totalCount,
                               currentPage,
                               pageSize,
                               onPageChanged, setCurrentPortion,
                               currentPortion,
                               portionSize = 15
                           }: PropsType) => {
    const pagesCount = Math.ceil(totalCount / pageSize)
    const totalPages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        totalPages.push(i)
    }

    const portionsCount = Math.ceil(pagesCount / portionSize)
    const leftPortionPageNumber = (currentPortion - 1) * portionSize + 1
    const rightPortionPageNumber = currentPortion * portionSize

    return (
        <div className={styles.paginationContainer}>
            { currentPortion > 1 &&
            <button onClick={() => { setCurrentPortion(currentPortion - 1) }}>PREV</button> }

            {totalPages
                .filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
                .map((p) => {
                    return <span className={currentPage === p ? `${styles.selectedPage}` : `${styles.paginationItem}`}
                                 key={p}
                                 onClick={() => onPageChanged(p)}>
                        {` ${p} `}
                    </span>})}
            { portionsCount > currentPortion &&
            <button onClick={() => { setCurrentPortion(currentPortion + 1) }}>NEXT</button> }
        </div>
    )
}