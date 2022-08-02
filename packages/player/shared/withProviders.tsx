import React from 'react';

export function withProviders(Component: React.ElementType, providers: React.ElementType[]) {
    return function (props?: object): JSX.Element {
        return providers.reduceRight((acc, Provider) => {
            return <Provider>{acc}</Provider>;
        }, <Component {...props} />);
    }
}