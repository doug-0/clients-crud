import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function PaginationTable({ links, prev_page, next_page }: {
  links: [{
    url: string,
    label: string,
    active: boolean
  }],
  prev_page: string,
  next_page: string
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={prev_page} />
        </PaginationItem>
        {
          links.map((link: {
            active: boolean,
            label: string,
            url: string
          }, index: number) => (
            <PaginationItem key={index}>
              <PaginationLink href={link.url}>{link.label}</PaginationLink>
            </PaginationItem>
          ))
        }
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <PaginationNext href={next_page} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
