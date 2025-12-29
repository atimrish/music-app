import { SelectAudios } from "@/src/entities/playlist/ui/SelectAudios";
import { StyledLabel } from "@/src/shared/ui/StyledLabel";
import { StyledTextInput } from "@/src/shared/ui/StyledTextInput";
import { VerticalMargin } from "@/src/shared/ui/VerticalMargin";
import { Wrapper } from "@/src/shared/ui/Wrapper";

export const AddPlaylistPage = () => {
	return (
		<VerticalMargin>
			<Wrapper>
				<StyledLabel text="Название" />
				<StyledTextInput />

				<StyledLabel text="Выбранные аудио" />
				<SelectAudios />
			</Wrapper>
		</VerticalMargin>
	);
};
