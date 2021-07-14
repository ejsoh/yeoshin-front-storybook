import {
	BottomSectorIcon,
	LeftBottomIcon,
	LeftSectorIcon,
	LeftTopIcon,
	MarkerBase,
	MarkerContainer,
	RightBottomIcon,
	RightSectorIcon,
	RightTopIcon,
	SectorContainer,
} from "components/atoms";

import React from "react";

type IconType = {
	selectedFilter: string[];
};

export const FilterIcon = ({ selectedFilter = [] }: IconType) => {
	const len = selectedFilter.length;

	const fill = (item: string[], total: number) => {
		return Array(total).fill(item).flat().sort();
	};

	const icon = (items: string[]) => {
		const len = items.length === 1 ? 4 : 2;
		const item = items.length <= 2 ? fill(items, len) : items;
		return (
			<MarkerBase onClick={() => console.log(1)}>
				<MarkerContainer>
					<LeftTopIcon image={item[0]}></LeftTopIcon>
					<LeftBottomIcon image={item[1]}></LeftBottomIcon>
					<RightTopIcon image={item[2]}></RightTopIcon>
					<RightBottomIcon image={item[3]}></RightBottomIcon>
				</MarkerContainer>
			</MarkerBase>
		);
	};
	const sectorIcon = (item: string[]) => {
		return (
			<MarkerBase>
				<SectorContainer>
					<LeftSectorIcon image={item[0]}></LeftSectorIcon>
					<RightSectorIcon image={item[1]}></RightSectorIcon>
					<BottomSectorIcon image={item[2]}></BottomSectorIcon>
				</SectorContainer>
			</MarkerBase>
		);
	};
	const renderIcon =
		len === 3 ? sectorIcon(selectedFilter) : icon([...selectedFilter]);

	return renderIcon;
};
