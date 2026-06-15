import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ConversionModel = runtime.Types.Result.DefaultSelection<Prisma.$ConversionPayload>;
export type AggregateConversion = {
    _count: ConversionCountAggregateOutputType | null;
    _avg: ConversionAvgAggregateOutputType | null;
    _sum: ConversionSumAggregateOutputType | null;
    _min: ConversionMinAggregateOutputType | null;
    _max: ConversionMaxAggregateOutputType | null;
};
export type ConversionAvgAggregateOutputType = {
    originalSize: number | null;
};
export type ConversionSumAggregateOutputType = {
    originalSize: number | null;
};
export type ConversionMinAggregateOutputType = {
    id: string | null;
    originalName: string | null;
    originalSize: number | null;
    fromFormat: string | null;
    toFormat: string | null;
    fileUrl: string | null;
    createdAt: Date | null;
    expiresAt: Date | null;
};
export type ConversionMaxAggregateOutputType = {
    id: string | null;
    originalName: string | null;
    originalSize: number | null;
    fromFormat: string | null;
    toFormat: string | null;
    fileUrl: string | null;
    createdAt: Date | null;
    expiresAt: Date | null;
};
export type ConversionCountAggregateOutputType = {
    id: number;
    originalName: number;
    originalSize: number;
    fromFormat: number;
    toFormat: number;
    fileUrl: number;
    createdAt: number;
    expiresAt: number;
    _all: number;
};
export type ConversionAvgAggregateInputType = {
    originalSize?: true;
};
export type ConversionSumAggregateInputType = {
    originalSize?: true;
};
export type ConversionMinAggregateInputType = {
    id?: true;
    originalName?: true;
    originalSize?: true;
    fromFormat?: true;
    toFormat?: true;
    fileUrl?: true;
    createdAt?: true;
    expiresAt?: true;
};
export type ConversionMaxAggregateInputType = {
    id?: true;
    originalName?: true;
    originalSize?: true;
    fromFormat?: true;
    toFormat?: true;
    fileUrl?: true;
    createdAt?: true;
    expiresAt?: true;
};
export type ConversionCountAggregateInputType = {
    id?: true;
    originalName?: true;
    originalSize?: true;
    fromFormat?: true;
    toFormat?: true;
    fileUrl?: true;
    createdAt?: true;
    expiresAt?: true;
    _all?: true;
};
export type ConversionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversionWhereInput;
    orderBy?: Prisma.ConversionOrderByWithRelationInput | Prisma.ConversionOrderByWithRelationInput[];
    cursor?: Prisma.ConversionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ConversionCountAggregateInputType;
    _avg?: ConversionAvgAggregateInputType;
    _sum?: ConversionSumAggregateInputType;
    _min?: ConversionMinAggregateInputType;
    _max?: ConversionMaxAggregateInputType;
};
export type GetConversionAggregateType<T extends ConversionAggregateArgs> = {
    [P in keyof T & keyof AggregateConversion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateConversion[P]> : Prisma.GetScalarType<T[P], AggregateConversion[P]>;
};
export type ConversionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversionWhereInput;
    orderBy?: Prisma.ConversionOrderByWithAggregationInput | Prisma.ConversionOrderByWithAggregationInput[];
    by: Prisma.ConversionScalarFieldEnum[] | Prisma.ConversionScalarFieldEnum;
    having?: Prisma.ConversionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ConversionCountAggregateInputType | true;
    _avg?: ConversionAvgAggregateInputType;
    _sum?: ConversionSumAggregateInputType;
    _min?: ConversionMinAggregateInputType;
    _max?: ConversionMaxAggregateInputType;
};
export type ConversionGroupByOutputType = {
    id: string;
    originalName: string;
    originalSize: number;
    fromFormat: string;
    toFormat: string;
    fileUrl: string;
    createdAt: Date;
    expiresAt: Date;
    _count: ConversionCountAggregateOutputType | null;
    _avg: ConversionAvgAggregateOutputType | null;
    _sum: ConversionSumAggregateOutputType | null;
    _min: ConversionMinAggregateOutputType | null;
    _max: ConversionMaxAggregateOutputType | null;
};
export type GetConversionGroupByPayload<T extends ConversionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ConversionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ConversionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ConversionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ConversionGroupByOutputType[P]>;
}>>;
export type ConversionWhereInput = {
    AND?: Prisma.ConversionWhereInput | Prisma.ConversionWhereInput[];
    OR?: Prisma.ConversionWhereInput[];
    NOT?: Prisma.ConversionWhereInput | Prisma.ConversionWhereInput[];
    id?: Prisma.StringFilter<"Conversion"> | string;
    originalName?: Prisma.StringFilter<"Conversion"> | string;
    originalSize?: Prisma.IntFilter<"Conversion"> | number;
    fromFormat?: Prisma.StringFilter<"Conversion"> | string;
    toFormat?: Prisma.StringFilter<"Conversion"> | string;
    fileUrl?: Prisma.StringFilter<"Conversion"> | string;
    createdAt?: Prisma.DateTimeFilter<"Conversion"> | Date | string;
    expiresAt?: Prisma.DateTimeFilter<"Conversion"> | Date | string;
};
export type ConversionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    originalName?: Prisma.SortOrder;
    originalSize?: Prisma.SortOrder;
    fromFormat?: Prisma.SortOrder;
    toFormat?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type ConversionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ConversionWhereInput | Prisma.ConversionWhereInput[];
    OR?: Prisma.ConversionWhereInput[];
    NOT?: Prisma.ConversionWhereInput | Prisma.ConversionWhereInput[];
    originalName?: Prisma.StringFilter<"Conversion"> | string;
    originalSize?: Prisma.IntFilter<"Conversion"> | number;
    fromFormat?: Prisma.StringFilter<"Conversion"> | string;
    toFormat?: Prisma.StringFilter<"Conversion"> | string;
    fileUrl?: Prisma.StringFilter<"Conversion"> | string;
    createdAt?: Prisma.DateTimeFilter<"Conversion"> | Date | string;
    expiresAt?: Prisma.DateTimeFilter<"Conversion"> | Date | string;
}, "id">;
export type ConversionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    originalName?: Prisma.SortOrder;
    originalSize?: Prisma.SortOrder;
    fromFormat?: Prisma.SortOrder;
    toFormat?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    _count?: Prisma.ConversionCountOrderByAggregateInput;
    _avg?: Prisma.ConversionAvgOrderByAggregateInput;
    _max?: Prisma.ConversionMaxOrderByAggregateInput;
    _min?: Prisma.ConversionMinOrderByAggregateInput;
    _sum?: Prisma.ConversionSumOrderByAggregateInput;
};
export type ConversionScalarWhereWithAggregatesInput = {
    AND?: Prisma.ConversionScalarWhereWithAggregatesInput | Prisma.ConversionScalarWhereWithAggregatesInput[];
    OR?: Prisma.ConversionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ConversionScalarWhereWithAggregatesInput | Prisma.ConversionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Conversion"> | string;
    originalName?: Prisma.StringWithAggregatesFilter<"Conversion"> | string;
    originalSize?: Prisma.IntWithAggregatesFilter<"Conversion"> | number;
    fromFormat?: Prisma.StringWithAggregatesFilter<"Conversion"> | string;
    toFormat?: Prisma.StringWithAggregatesFilter<"Conversion"> | string;
    fileUrl?: Prisma.StringWithAggregatesFilter<"Conversion"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Conversion"> | Date | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"Conversion"> | Date | string;
};
export type ConversionCreateInput = {
    id?: string;
    originalName: string;
    originalSize: number;
    fromFormat: string;
    toFormat: string;
    fileUrl: string;
    createdAt?: Date | string;
    expiresAt: Date | string;
};
export type ConversionUncheckedCreateInput = {
    id?: string;
    originalName: string;
    originalSize: number;
    fromFormat: string;
    toFormat: string;
    fileUrl: string;
    createdAt?: Date | string;
    expiresAt: Date | string;
};
export type ConversionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    originalName?: Prisma.StringFieldUpdateOperationsInput | string;
    originalSize?: Prisma.IntFieldUpdateOperationsInput | number;
    fromFormat?: Prisma.StringFieldUpdateOperationsInput | string;
    toFormat?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    originalName?: Prisma.StringFieldUpdateOperationsInput | string;
    originalSize?: Prisma.IntFieldUpdateOperationsInput | number;
    fromFormat?: Prisma.StringFieldUpdateOperationsInput | string;
    toFormat?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversionCreateManyInput = {
    id?: string;
    originalName: string;
    originalSize: number;
    fromFormat: string;
    toFormat: string;
    fileUrl: string;
    createdAt?: Date | string;
    expiresAt: Date | string;
};
export type ConversionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    originalName?: Prisma.StringFieldUpdateOperationsInput | string;
    originalSize?: Prisma.IntFieldUpdateOperationsInput | number;
    fromFormat?: Prisma.StringFieldUpdateOperationsInput | string;
    toFormat?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    originalName?: Prisma.StringFieldUpdateOperationsInput | string;
    originalSize?: Prisma.IntFieldUpdateOperationsInput | number;
    fromFormat?: Prisma.StringFieldUpdateOperationsInput | string;
    toFormat?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    originalName?: Prisma.SortOrder;
    originalSize?: Prisma.SortOrder;
    fromFormat?: Prisma.SortOrder;
    toFormat?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type ConversionAvgOrderByAggregateInput = {
    originalSize?: Prisma.SortOrder;
};
export type ConversionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    originalName?: Prisma.SortOrder;
    originalSize?: Prisma.SortOrder;
    fromFormat?: Prisma.SortOrder;
    toFormat?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type ConversionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    originalName?: Prisma.SortOrder;
    originalSize?: Prisma.SortOrder;
    fromFormat?: Prisma.SortOrder;
    toFormat?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type ConversionSumOrderByAggregateInput = {
    originalSize?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type ConversionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    originalName?: boolean;
    originalSize?: boolean;
    fromFormat?: boolean;
    toFormat?: boolean;
    fileUrl?: boolean;
    createdAt?: boolean;
    expiresAt?: boolean;
}, ExtArgs["result"]["conversion"]>;
export type ConversionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    originalName?: boolean;
    originalSize?: boolean;
    fromFormat?: boolean;
    toFormat?: boolean;
    fileUrl?: boolean;
    createdAt?: boolean;
    expiresAt?: boolean;
}, ExtArgs["result"]["conversion"]>;
export type ConversionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    originalName?: boolean;
    originalSize?: boolean;
    fromFormat?: boolean;
    toFormat?: boolean;
    fileUrl?: boolean;
    createdAt?: boolean;
    expiresAt?: boolean;
}, ExtArgs["result"]["conversion"]>;
export type ConversionSelectScalar = {
    id?: boolean;
    originalName?: boolean;
    originalSize?: boolean;
    fromFormat?: boolean;
    toFormat?: boolean;
    fileUrl?: boolean;
    createdAt?: boolean;
    expiresAt?: boolean;
};
export type ConversionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "originalName" | "originalSize" | "fromFormat" | "toFormat" | "fileUrl" | "createdAt" | "expiresAt", ExtArgs["result"]["conversion"]>;
export type $ConversionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Conversion";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        originalName: string;
        originalSize: number;
        fromFormat: string;
        toFormat: string;
        fileUrl: string;
        createdAt: Date;
        expiresAt: Date;
    }, ExtArgs["result"]["conversion"]>;
    composites: {};
};
export type ConversionGetPayload<S extends boolean | null | undefined | ConversionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ConversionPayload, S>;
export type ConversionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ConversionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ConversionCountAggregateInputType | true;
};
export interface ConversionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Conversion'];
        meta: {
            name: 'Conversion';
        };
    };
    findUnique<T extends ConversionFindUniqueArgs>(args: Prisma.SelectSubset<T, ConversionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ConversionClient<runtime.Types.Result.GetResult<Prisma.$ConversionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ConversionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ConversionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConversionClient<runtime.Types.Result.GetResult<Prisma.$ConversionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ConversionFindFirstArgs>(args?: Prisma.SelectSubset<T, ConversionFindFirstArgs<ExtArgs>>): Prisma.Prisma__ConversionClient<runtime.Types.Result.GetResult<Prisma.$ConversionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ConversionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ConversionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConversionClient<runtime.Types.Result.GetResult<Prisma.$ConversionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ConversionFindManyArgs>(args?: Prisma.SelectSubset<T, ConversionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ConversionCreateArgs>(args: Prisma.SelectSubset<T, ConversionCreateArgs<ExtArgs>>): Prisma.Prisma__ConversionClient<runtime.Types.Result.GetResult<Prisma.$ConversionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ConversionCreateManyArgs>(args?: Prisma.SelectSubset<T, ConversionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ConversionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ConversionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ConversionDeleteArgs>(args: Prisma.SelectSubset<T, ConversionDeleteArgs<ExtArgs>>): Prisma.Prisma__ConversionClient<runtime.Types.Result.GetResult<Prisma.$ConversionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ConversionUpdateArgs>(args: Prisma.SelectSubset<T, ConversionUpdateArgs<ExtArgs>>): Prisma.Prisma__ConversionClient<runtime.Types.Result.GetResult<Prisma.$ConversionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ConversionDeleteManyArgs>(args?: Prisma.SelectSubset<T, ConversionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ConversionUpdateManyArgs>(args: Prisma.SelectSubset<T, ConversionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ConversionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ConversionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ConversionUpsertArgs>(args: Prisma.SelectSubset<T, ConversionUpsertArgs<ExtArgs>>): Prisma.Prisma__ConversionClient<runtime.Types.Result.GetResult<Prisma.$ConversionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ConversionCountArgs>(args?: Prisma.Subset<T, ConversionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ConversionCountAggregateOutputType> : number>;
    aggregate<T extends ConversionAggregateArgs>(args: Prisma.Subset<T, ConversionAggregateArgs>): Prisma.PrismaPromise<GetConversionAggregateType<T>>;
    groupBy<T extends ConversionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ConversionGroupByArgs['orderBy'];
    } : {
        orderBy?: ConversionGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ConversionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ConversionFieldRefs;
}
export interface Prisma__ConversionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ConversionFieldRefs {
    readonly id: Prisma.FieldRef<"Conversion", 'String'>;
    readonly originalName: Prisma.FieldRef<"Conversion", 'String'>;
    readonly originalSize: Prisma.FieldRef<"Conversion", 'Int'>;
    readonly fromFormat: Prisma.FieldRef<"Conversion", 'String'>;
    readonly toFormat: Prisma.FieldRef<"Conversion", 'String'>;
    readonly fileUrl: Prisma.FieldRef<"Conversion", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Conversion", 'DateTime'>;
    readonly expiresAt: Prisma.FieldRef<"Conversion", 'DateTime'>;
}
export type ConversionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversionSelect<ExtArgs> | null;
    omit?: Prisma.ConversionOmit<ExtArgs> | null;
    where: Prisma.ConversionWhereUniqueInput;
};
export type ConversionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversionSelect<ExtArgs> | null;
    omit?: Prisma.ConversionOmit<ExtArgs> | null;
    where: Prisma.ConversionWhereUniqueInput;
};
export type ConversionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversionSelect<ExtArgs> | null;
    omit?: Prisma.ConversionOmit<ExtArgs> | null;
    where?: Prisma.ConversionWhereInput;
    orderBy?: Prisma.ConversionOrderByWithRelationInput | Prisma.ConversionOrderByWithRelationInput[];
    cursor?: Prisma.ConversionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversionScalarFieldEnum | Prisma.ConversionScalarFieldEnum[];
};
export type ConversionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversionSelect<ExtArgs> | null;
    omit?: Prisma.ConversionOmit<ExtArgs> | null;
    where?: Prisma.ConversionWhereInput;
    orderBy?: Prisma.ConversionOrderByWithRelationInput | Prisma.ConversionOrderByWithRelationInput[];
    cursor?: Prisma.ConversionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversionScalarFieldEnum | Prisma.ConversionScalarFieldEnum[];
};
export type ConversionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversionSelect<ExtArgs> | null;
    omit?: Prisma.ConversionOmit<ExtArgs> | null;
    where?: Prisma.ConversionWhereInput;
    orderBy?: Prisma.ConversionOrderByWithRelationInput | Prisma.ConversionOrderByWithRelationInput[];
    cursor?: Prisma.ConversionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversionScalarFieldEnum | Prisma.ConversionScalarFieldEnum[];
};
export type ConversionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversionSelect<ExtArgs> | null;
    omit?: Prisma.ConversionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversionCreateInput, Prisma.ConversionUncheckedCreateInput>;
};
export type ConversionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ConversionCreateManyInput | Prisma.ConversionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ConversionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConversionOmit<ExtArgs> | null;
    data: Prisma.ConversionCreateManyInput | Prisma.ConversionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ConversionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversionSelect<ExtArgs> | null;
    omit?: Prisma.ConversionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversionUpdateInput, Prisma.ConversionUncheckedUpdateInput>;
    where: Prisma.ConversionWhereUniqueInput;
};
export type ConversionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ConversionUpdateManyMutationInput, Prisma.ConversionUncheckedUpdateManyInput>;
    where?: Prisma.ConversionWhereInput;
    limit?: number;
};
export type ConversionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConversionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversionUpdateManyMutationInput, Prisma.ConversionUncheckedUpdateManyInput>;
    where?: Prisma.ConversionWhereInput;
    limit?: number;
};
export type ConversionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversionSelect<ExtArgs> | null;
    omit?: Prisma.ConversionOmit<ExtArgs> | null;
    where: Prisma.ConversionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversionCreateInput, Prisma.ConversionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ConversionUpdateInput, Prisma.ConversionUncheckedUpdateInput>;
};
export type ConversionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversionSelect<ExtArgs> | null;
    omit?: Prisma.ConversionOmit<ExtArgs> | null;
    where: Prisma.ConversionWhereUniqueInput;
};
export type ConversionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversionWhereInput;
    limit?: number;
};
export type ConversionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversionSelect<ExtArgs> | null;
    omit?: Prisma.ConversionOmit<ExtArgs> | null;
};
