import { FC, useState } from 'react';
import LightIcon from '../../../res/images/bulb.svg';
import color from '../../../interfaces/color';
import { Card } from '../../ui/card/card';
import { RGBW2Modal } from '../../ui/modals/rgbw2Modal/RGBW2Modal';
import { ToggleSwitch } from '../../ui/toggleSwitch/toggleSwitch';
import { ColorIndicator } from './../selectionCard/components/colorIndicator';

interface Props {
	id: string;
	name: string;
}

export const LightSelectionCard: FC<Props> = (props) => {
	const [name, setName] = useState<string>(props.name);
	const [open, setOpen] = useState<boolean>(false);
	const [selectedColor, setSelectedColor] = useState<color | undefined>();
	const [state, setState] = useState<boolean>(false);

	return (
		<>
			<RGBW2Modal open={open} setOpen={setOpen} setSelectedColor={setSelectedColor} />
			<div onClick={() => setOpen(true)}>
				<Card>
					<div className="flex flex-row items-center p-[10px] gap-x-[10px] content-between">
						<LightIcon />
						<div className="text-zinc-400 flex-grow">{props.name}</div>
						<ColorIndicator color={selectedColor ? selectedColor : { red: 0, green: 0, blue: 0 }} />
						<div onClick={() => setState(!state)}>
							<ToggleSwitch state={state} setState={setState} />
						</div>
					</div>
				</Card>
			</div>
		</>
	);
};
