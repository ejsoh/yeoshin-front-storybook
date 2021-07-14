import { ButtonProps } from "./index";
import { Icon } from "../Icons/Icon";
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";

const IconButtonStyle = styled.div<ButtonProps>`
	cursor: pointer;
	width: ${props => props.width + "px"};
	height: ${props => props.height + "px"};
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #ef4b81;
	border-radius: 4px;
	${props =>
		props.backgroundColor && `background-color: ${props.backgroundColor}`};
	${props => props.round && "border-radius: 50px"};
`;

export const IconButton = ({
	width,
	height,
	backgroundColor,
	iconName,
	iconSize,
	round,
	onClick,
}: ButtonProps) => {
	return (
		<IconButtonStyle
			width={width}
			height={height}
			backgroundColor={backgroundColor}
			round={round}
			onClick={onClick}
		>
			<Icon icon={iconName} size={iconSize} />
		</IconButtonStyle>
	);
};
