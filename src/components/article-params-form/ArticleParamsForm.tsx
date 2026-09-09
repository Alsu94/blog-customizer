import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

import { useState, useRef } from 'react';
import clsx from 'clsx';

import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import {
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	//Кнопка для открытия/закрытия сайдбра
	const [toggleBtn, setToggleBtn] = useState(false);
	const toggleMenu = () => {
		setToggleBtn((toggle) => !toggle);
	};

	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	); //Выбранный FontFamily для селекта
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption); //Выбранный FontSize (размер шрифта)
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor); //Выбранный FontColor (цвет шрифта)
	const [fontBackgroundColor, setFontBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	); //Выбранный FontBackgroundColor (цвет фона)
	const [fontWidthArr, setFontWidthArr] = useState(
		defaultArticleState.contentWidth
	); //Выбранный FontWidthArr (Ширина контента)

	//Для блока сайдбара
	const sidebarRef = useRef<HTMLDivElement>(null);

	//хук закрытия формы
	useOutsideClickClose({
		isOpen: toggleBtn,
		rootRef: sidebarRef,
		onChange: setToggleBtn,
	});

	const resetFilter = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setFontBackgroundColor(defaultArticleState.backgroundColor);
		setFontWidthArr(defaultArticleState.contentWidth);

		onApply(defaultArticleState);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		onApply({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: fontBackgroundColor,
			contentWidth: fontWidthArr,
		});
	};

	return (
		<>
			<ArrowButton isOpen={toggleBtn} onClick={toggleMenu} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: toggleBtn,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={resetFilter}>
					<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>

					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						onChange={setFontFamily}
						title='Шрифт'
					/>

					<RadioGroup
						name='fontSize'
						selected={fontSize}
						options={fontSizeOptions}
						onChange={setFontSize}
						title='Размер шрифта'></RadioGroup>

					<Select
						selected={fontColor}
						options={fontColors}
						onChange={setFontColor}
						title='Цвет шрифта'
					/>

					<Separator></Separator>

					<Select
						selected={fontBackgroundColor}
						options={backgroundColors}
						onChange={setFontBackgroundColor}
						title='Цвет фона'
					/>

					<Select
						selected={fontWidthArr}
						options={contentWidthArr}
						onChange={setFontWidthArr}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
