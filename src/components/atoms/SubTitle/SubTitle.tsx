import React from "react";
import styled from "@emotion/styled/macro";
// import { switchProp } from "styled-tools";
// import styled from 'styled-components';

export type SubTitleProps = {
	text1?: string;
	text2?: string;
	//temp
};

const CustomSubTitle = styled.div<SubTitleProps>`
	display: block;
`;

// theme : 쓰기, 쓰기불가, is-false

export const SubTitle = ({ text1, text2 }: SubTitleProps) => {
	return (
		<CustomSubTitle>
			{text1}
			{text2}
		</CustomSubTitle>
	);
};
