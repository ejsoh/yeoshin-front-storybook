import { Column, Row } from "components/atoms/Grid";

import { FixedButton } from "components/atoms/Button/Button";
import { Icon } from "components/atoms";
import { InputWrap } from "components/molecules";
import React from "react";
import { RequestConsultDomain } from "pages/mypage/RequestConsult";
import { Space } from "components/atoms/Spacing";
import { Text } from "components/atoms/Text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useFormHandler, useInjection } from "hooks";
import {
	Validation,
	validationTextMapper,
} from "components/molecules/anchors/ValidationAnchor";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";

export const RequestConsultContents = observer(() => {
	const { sendData } = RequestConsultDomain();
	const { interactionStore } = useInjection(mapper);
	const [info, setInfo] = React.useState({
		title: "",
		form: new FormData(),
		contents: `  
* 오류 발생 화면을 캡쳐하여 보내주세요.
* 휴대폰 기종, 버전, 티켓 번호 등 오류 발생 당시 상세한 상황을 적어주시면, 더욱 빠른 해결이 가능합니다. 
        
1. 어떤 점이 불편하셨나요?
답변 ) 
2. 어떤 메뉴와 화면에서 발생했나요? 
(스크린샷을 첨부해주세요)
답변 )
3. 결제/환불 관련 문의는, 반드시 15자리 '주문번호'를 기입해주세요!
답변 )
4. 휴대폰 기종과 운영체제 버전을 적어주세요.
답변 )`,
		name: "",
		url: "",
	});
	const formValue = useFormHandler({
		setValue: {
			title: title => {
				setInfo({ ...info, title: title });
			},
		},
		getValue: {
			title: info.title,
		},
	});
	const { getFormProps } = formValue;
	const getImage = (e: React.FormEvent<HTMLInputElement>) => {
		const target = (e.target as HTMLInputElement).files as FileList;
		const reader = new FileReader();
		reader.onloadend = () => {
			info.form.append("file", target[0]);
			setInfo({
				...info,
				name: target[0].name,
				url: reader.result as string,
			});
		};
		target[0] && reader.readAsDataURL(target[0]);
	};

	const saveMyConsult = () => {
		info.form.append("menuCode", "request");

		info.title === ""
			? interactionStore.setValidationMessage({
					title: "제목을 입력해 주세요.",
			  })
			: sendFormData();
	};

	const sendFormData = () => {
		info.form.append("content", info.contents);
		info.form.append("title", info.title);
		sendData(info.form);
	};

	const contents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInfo({ ...info, contents: e.target.value });
	};
	const passRefConfig = {
		target: interactionStore.getValidationMessage(),
		targets: ["title"],
		inputValue: getFormProps,
	};
	return (
		<Column
			css={css`
				height: auto;
				padding: 0 15px;
			`}
		>
			<Validation
				{...passRefConfig}
				current="title"
				text={validationTextMapper(
					interactionStore.getValidationMessage().title
				)}
			>
				<InputWrap labelText={"문의제목"} {...getFormProps("title")} />
			</Validation>
			<Space column={10} />

			<label
				css={css`
					position: relative;
					min-height: 46px;
				`}
			>
				<Row
					between
					css={css`
						background-color: #f5f5f5;
						border: 1px solid #e5e5e5;
						height: 100%;
						min-height: 45px;
					`}
				>
					<input
						type="file"
						css={css`
							display: none;
						`}
						onChange={getImage}
					/>

					<Icon
						css={css`
							padding: 0 10px;
							${info.name === ""
								? "display: flex;"
								: "display: none !important"}
						`}
						icon="sv_file"
						format="png"
					/>
					<Text
						size={14}
						lightgray
						css={css`
							white-space: pre !important;
							${info.name === ""
								? "display: flex;"
								: "display: none !important"}
						`}
					>
						첨부 이미지를 등록해 주세요.
					</Text>

					<Icon
						icon="sv_photo"
						size={15}
						css={css`
							background-color: #333;
							padding: 15px;
							position: absolute;
							top: 0;
							right: 0;
						`}
						format="png"
					/>
					<img src={info.url} />
				</Row>
			</label>

			<Space column={10} />

			<textarea
				onChange={contents}
				value={info.contents}
				css={css`
					height: 300px;
					white-space: pre-line;
					font-size: 12px;
					line-height: 23px;
				`}
			/>
			<Space column={10} />

			<FixedButton title={"문의하기"} onClick={saveMyConsult} />
		</Column>
	);
});
