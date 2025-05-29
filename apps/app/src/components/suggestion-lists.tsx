import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@coordinize/ui/components/command";
import { Popover, PopoverContent } from "@coordinize/ui/components/popover";

export function SuggestionRoot({children}: {children: React.ReactNode}){
    return (
        <Popover>
            <PopoverContent>
                <Command >
                    <CommandInput />
                    <CommandList>{children}</CommandList>
                    <CommandEmpty>
                        No result
                    </CommandEmpty>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export function SuggestionItem({children}: {children: React.ReactNode}){
    return (
        <CommandItem>
            {children}
        </CommandItem>
    )
}